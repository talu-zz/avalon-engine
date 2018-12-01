import { Vote, VoteSerialized } from '../../src/vote';

test('should get vote', () => {
  const vote = new Vote('user-1', true);

  expect(vote.getUsername()).toEqual('user-1');
});

test('should get username', () => {
  const vote = new Vote('user-1', true);

  expect(vote.getValue()).toStrictEqual(true);
});

test('should serialize', () => {
  const vote = new Vote('some-user', false);

  const actual = vote.serialize();

  const expected: VoteSerialized = {
    username: 'some-user',
    value: false,
  };

  expect(actual).toEqual(expected);
});