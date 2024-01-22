import omit from 'lodash.omit';
import { SchemaObject } from 'openapi3-ts';
import { resolveExampleRefs, resolveObject } from '../resolvers';
import {
  ContextSpecs,
  GeneratorImport,
  GeneratorSchema,
  ScalarValue,
  SchemaType,
} from '../types';
import { getNumberWord, pascal } from '../utils';
import { getEnumImplementation } from './enum';
import { getScalar } from './scalar';

type CombinedData = {
  imports: GeneratorImport[];
  schemas: GeneratorSchema[];
  originalSchema: (SchemaObject | undefined)[];
  values: string[];
  isRef: boolean[];
  isEnum: boolean[];
  types: string[];
  hasReadonlyProps: boolean;
  /**
   * List of all properties in all subschemas
   * - used to add missing properties in subschemas to avoid TS error described in @see https://github.com/anymaniax/orval/issues/935
   */
  allProperties: string[];
};

type Separator = 'allOf' | 'anyOf' | 'oneOf';

const combineValues = ({
  resolvedData,
  resolvedValue,
  separator,
}: {
  resolvedData: CombinedData;
  resolvedValue?: ScalarValue;
  separator: Separator;
}) => {
  const isAllEnums = resolvedData.isEnum.every((v) => v);

  if (isAllEnums) {
    return `${resolvedData.values.join(` | `)}${
      resolvedValue ? ` | ${resolvedValue.value}` : ''
    }`;
  }

  if (separator === 'allOf') {
    return `${resolvedData.values.join(` & `)}${
      resolvedValue ? ` & ${resolvedValue.value}` : ''
    }`;
  }

  let values = resolvedData.values;
  const hasObjectSubschemas = resolvedData.allProperties.length;
  if (hasObjectSubschemas) {
    values = []; // the list of values will be rebuilt to add missing properties (if exist) in subschemas
    for (let i = 0; i < resolvedData.values.length; i += 1) {
      const subSchema = resolvedData.originalSchema[i];
      if (subSchema?.type !== 'object') {
        values.push(resolvedData.values[i]);
        continue;
      }

      const missingProperties = resolvedData.allProperties.filter(
        (p) => !Object.keys(subSchema.properties!).includes(p),
      );
      values.push(
        `${resolvedData.values[i]}${
          missingProperties.length
            ? ` & {${missingProperties.map((p) => `${p}?: never`).join('; ')}}`
            : ''
        }`,
      );
    }
  }

  if (resolvedValue) {
    return `(${values.join(` & ${resolvedValue.value}) | (`)} & ${
      resolvedValue.value
    })`;
  }

  return values.join(' | ');
};

export const combineSchemas = ({
  name,
  schema,
  separator,
  context,
  nullable,
}: {
  name?: string;
  schema: SchemaObject;
  separator: Separator;
  context: ContextSpecs;
  nullable: string;
}): ScalarValue => {
  const items = schema[separator] ?? [];

  const resolvedData = items.reduce<CombinedData>(
    (acc, subSchema) => {
      let propName = name ? name + pascal(separator) : undefined;
      if (propName && acc.schemas.length) {
        propName = propName + pascal(getNumberWord(acc.schemas.length + 1));
      }

      const resolvedValue = resolveObject({
        schema: subSchema,
        propName,
        combined: true,
        context,
      });

      acc.values.push(resolvedValue.value);
      acc.imports.push(...resolvedValue.imports);
      acc.schemas.push(...resolvedValue.schemas);
      acc.isEnum.push(resolvedValue.isEnum);
      acc.types.push(resolvedValue.type);
      acc.isRef.push(resolvedValue.isRef);
      acc.originalSchema.push(resolvedValue.originalSchema);
      acc.hasReadonlyProps ||= resolvedValue.hasReadonlyProps;

      if (
        resolvedValue.type === 'object' &&
        resolvedValue.originalSchema.properties
      ) {
        acc.allProperties.push(
          ...Object.keys(resolvedValue.originalSchema.properties),
        );
      }

      return acc;
    },
    {
      values: [],
      imports: [],
      schemas: [],
      isEnum: [], // check if only enums
      isRef: [],
      types: [],
      originalSchema: [],
      allProperties: [],
      hasReadonlyProps: false,
      example: schema.example,
      examples: resolveExampleRefs(schema.examples, context),
    } as CombinedData,
  );

  const isAllEnums = resolvedData.isEnum.every((v) => v);

  let resolvedValue;

  if (schema.properties) {
    resolvedValue = getScalar({ item: omit(schema, separator), name, context });
  }

  const value = combineValues({ resolvedData, separator, resolvedValue });

  if (isAllEnums && name && items.length > 1) {
    const newEnum = `\n\n// eslint-disable-next-line @typescript-eslint/no-redeclare\nexport const ${pascal(
      name,
    )} = ${getCombineEnumValue(resolvedData)}`;

    return {
      value:
        `typeof ${pascal(name)}[keyof typeof ${pascal(name)}] ${nullable};` +
        newEnum,
      imports: resolvedData.imports.map<GeneratorImport>((toImport) => ({
        ...toImport,
        values: true,
      })),
      schemas: resolvedData.schemas,
      isEnum: false,
      type: 'object' as SchemaType,
      isRef: false,
      hasReadonlyProps: resolvedData.hasReadonlyProps,
      example: schema.example,
      examples: resolveExampleRefs(schema.examples, context),
    };
  }

  return {
    value: value + nullable,
    imports: resolvedValue
      ? [...resolvedData.imports, ...resolvedValue.imports]
      : resolvedData.imports,
    schemas: resolvedValue
      ? [...resolvedData.schemas, ...resolvedValue.schemas]
      : resolvedData.schemas,
    isEnum: false,
    type: 'object' as SchemaType,
    isRef: false,
    hasReadonlyProps:
      resolvedData?.hasReadonlyProps ||
      resolvedValue?.hasReadonlyProps ||
      false,
    example: schema.example,
    examples: resolveExampleRefs(schema.examples, context),
  };
};

const getCombineEnumValue = ({
  values,
  isRef,
  originalSchema,
}: CombinedData) => {
  if (values.length === 1) {
    if (isRef[0]) {
      return values[0];
    }

    return `{${getEnumImplementation(values[0])}} as const`;
  }

  const enums = values
    .map((e, i) => {
      if (isRef[i]) {
        return `...${e},`;
      }

      const names = originalSchema[i]?.['x-enumNames'] as string[];

      return getEnumImplementation(e, names);
    })
    .join('');

  return `{${enums}} as const`;
};
