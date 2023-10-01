/**
 * Generated by orval v6.18.0 🍺
 * Do not edit manually.
 * Swagger Petstore
 * OpenAPI spec version: 1.0.0
 */
import { rest } from 'msw';
import { faker } from '@faker-js/faker';

export const getListPetsMock = () =>
  Array.from(
    { length: faker.datatype.number({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() =>
    faker.helpers.arrayElement([
      {
        cuteness: faker.number.int({ min: undefined, max: undefined }),
        breed: faker.helpers.arrayElement(['Labradoodle']),
        barksPerMinute: faker.helpers.arrayElement([
          faker.number.int({ min: undefined, max: undefined }),
          undefined,
        ]),
        type: faker.helpers.arrayElement(['dog']),
      },
      {
        length: faker.number.int({ min: undefined, max: undefined }),
        breed: faker.helpers.arrayElement(['Dachshund']),
        barksPerMinute: faker.helpers.arrayElement([
          faker.number.int({ min: undefined, max: undefined }),
          undefined,
        ]),
        type: faker.helpers.arrayElement(['dog']),
        '@id': faker.helpers.arrayElement([faker.word.sample(), undefined]),
        id: (() => faker.number.int({ min: 1, max: 99999 }))(),
        name: (() => faker.person.lastName())(),
        tag: (() => faker.person.lastName())(),
        email: faker.helpers.arrayElement([faker.internet.email(), undefined]),
        callingCode: faker.helpers.arrayElement([
          faker.helpers.arrayElement(['+33', '+420', '+33']),
          undefined,
        ]),
        country: faker.helpers.arrayElement([
          faker.helpers.arrayElement(["People's Republic of China", 'Uruguay']),
          undefined,
        ]),
      },
      {
        petsRequested: faker.helpers.arrayElement([
          faker.number.int({ min: undefined, max: undefined }),
          undefined,
        ]),
        type: faker.helpers.arrayElement(['cat']),
        '@id': faker.helpers.arrayElement([faker.word.sample(), undefined]),
        id: (() => faker.number.int({ min: 1, max: 99999 }))(),
        name: (() => faker.person.lastName())(),
        tag: (() => faker.person.lastName())(),
        email: faker.helpers.arrayElement([faker.internet.email(), undefined]),
        callingCode: faker.helpers.arrayElement([
          faker.helpers.arrayElement(['+33', '+420', '+33']),
          undefined,
        ]),
        country: faker.helpers.arrayElement([
          faker.helpers.arrayElement(["People's Republic of China", 'Uruguay']),
          undefined,
        ]),
      },
    ]),
  );

export const getCreatePetsMock = () =>
  faker.helpers.arrayElement([
    {
      cuteness: faker.number.int({ min: undefined, max: undefined }),
      breed: faker.helpers.arrayElement(['Labradoodle']),
      barksPerMinute: faker.helpers.arrayElement([
        faker.number.int({ min: undefined, max: undefined }),
        undefined,
      ]),
      type: faker.helpers.arrayElement(['dog']),
    },
    {
      length: faker.number.int({ min: undefined, max: undefined }),
      breed: faker.helpers.arrayElement(['Dachshund']),
      barksPerMinute: faker.helpers.arrayElement([
        faker.number.int({ min: undefined, max: undefined }),
        undefined,
      ]),
      type: faker.helpers.arrayElement(['dog']),
      '@id': faker.helpers.arrayElement([faker.word.sample(), undefined]),
      id: faker.number.int({ min: undefined, max: undefined }),
      name: (() => faker.person.lastName())(),
      tag: (() => faker.person.lastName())(),
      email: faker.helpers.arrayElement([faker.internet.email(), undefined]),
      callingCode: faker.helpers.arrayElement([
        faker.helpers.arrayElement(['+33', '+420', '+33']),
        undefined,
      ]),
      country: faker.helpers.arrayElement([
        faker.helpers.arrayElement(["People's Republic of China", 'Uruguay']),
        undefined,
      ]),
    },
    {
      petsRequested: faker.helpers.arrayElement([
        faker.number.int({ min: undefined, max: undefined }),
        undefined,
      ]),
      type: faker.helpers.arrayElement(['cat']),
      '@id': faker.helpers.arrayElement([faker.word.sample(), undefined]),
      id: faker.number.int({ min: undefined, max: undefined }),
      name: (() => faker.person.lastName())(),
      tag: (() => faker.person.lastName())(),
      email: faker.helpers.arrayElement([faker.internet.email(), undefined]),
      callingCode: faker.helpers.arrayElement([
        faker.helpers.arrayElement(['+33', '+420', '+33']),
        undefined,
      ]),
      country: faker.helpers.arrayElement([
        faker.helpers.arrayElement(["People's Republic of China", 'Uruguay']),
        undefined,
      ]),
    },
  ]);

export const getUpdatePetsMock = () =>
  faker.helpers.arrayElement([
    {
      cuteness: faker.number.int({ min: undefined, max: undefined }),
      breed: faker.helpers.arrayElement(['Labradoodle']),
      barksPerMinute: faker.helpers.arrayElement([
        faker.number.int({ min: undefined, max: undefined }),
        undefined,
      ]),
      type: faker.helpers.arrayElement(['dog']),
    },
    {
      length: faker.number.int({ min: undefined, max: undefined }),
      breed: faker.helpers.arrayElement(['Dachshund']),
      barksPerMinute: faker.helpers.arrayElement([
        faker.number.int({ min: undefined, max: undefined }),
        undefined,
      ]),
      type: faker.helpers.arrayElement(['dog']),
      '@id': faker.helpers.arrayElement([faker.word.sample(), undefined]),
      id: faker.number.int({ min: undefined, max: undefined }),
      name: (() => faker.person.lastName())(),
      tag: (() => faker.person.lastName())(),
      email: faker.helpers.arrayElement([faker.internet.email(), undefined]),
      callingCode: faker.helpers.arrayElement([
        faker.helpers.arrayElement(['+33', '+420', '+33']),
        undefined,
      ]),
      country: faker.helpers.arrayElement([
        faker.helpers.arrayElement(["People's Republic of China", 'Uruguay']),
        undefined,
      ]),
    },
    {
      petsRequested: faker.helpers.arrayElement([
        faker.number.int({ min: undefined, max: undefined }),
        undefined,
      ]),
      type: faker.helpers.arrayElement(['cat']),
      '@id': faker.helpers.arrayElement([faker.word.sample(), undefined]),
      id: faker.number.int({ min: undefined, max: undefined }),
      name: (() => faker.person.lastName())(),
      tag: (() => faker.person.lastName())(),
      email: faker.helpers.arrayElement([faker.internet.email(), undefined]),
      callingCode: faker.helpers.arrayElement([
        faker.helpers.arrayElement(['+33', '+420', '+33']),
        undefined,
      ]),
      country: faker.helpers.arrayElement([
        faker.helpers.arrayElement(["People's Republic of China", 'Uruguay']),
        undefined,
      ]),
    },
  ]);

export const getShowPetByIdMock = () =>
  (() => ({
    id: faker.number.int({ min: 1, max: 99 }),
    name: faker.person.firstName(),
    tag: faker.helpers.arrayElement([faker.word.sample(), void 0]),
  }))();

export const getSwaggerPetstoreMSW = () => [
  rest.get('*/v:version/pets', (_req, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.status(200, 'Mocked status'),
      ctx.json(getListPetsMock()),
    );
  }),
  rest.post('*/v:version/pets', (_req, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.status(200, 'Mocked status'),
      ctx.json(getCreatePetsMock()),
    );
  }),
  rest.put('*/v:version/pets', (_req, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.status(200, 'Mocked status'),
      ctx.json(getUpdatePetsMock()),
    );
  }),
  rest.get('*/v:version/pets/:petId', (_req, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.status(200, 'Mocked status'),
      ctx.json(getShowPetByIdMock()),
    );
  }),
];
