import getLoginURL from "../getLoginURL";

test('should return correct login url', () => {
    process.env.REACT_APP_SERVER_ENDPOINT = 'SOME_STRING';


    expect(getLoginURL()).toBe(`${process.env.REACT_APP_SERVER_ENDPOINT}/login`)
})