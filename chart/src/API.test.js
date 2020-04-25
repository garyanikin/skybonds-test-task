import API, {PERIOD} from './API';

test('period week', async () => {
  const data = await API(1, PERIOD.WEEK)

  expect(data.length).toStrictEqual(7);
});

test('period month', async () => {
  const data = await API(1, PERIOD.MONTH)

  expect(data.length).toStrictEqual(30);
});

test('period quarter', async () => {
  const data = await API(PERIOD.QUARTER)

  expect(data.length).toStrictEqual(30);
});

test('period year', async () => {
  const data = await API(1, PERIOD.YEAR)

  expect(data.length).toStrictEqual(30);
});

test('period max', async () => {
  const data = await API(1, PERIOD.MAX)

  expect(data.length).toStrictEqual(30);
});