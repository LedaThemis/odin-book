import getFormattedTime from '../getFormattedTime';

test('should return correctly formatted time', () => {
    const date = new Date();
    const dateString = date.toString();

    expect(getFormattedTime(dateString)).toBe(date.toLocaleString());
});
