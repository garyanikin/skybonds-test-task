import API from './API';

export const CHANGE_PARAM = 'CHANGE_PARAM';
export const CHANGE_PERIOD = 'CHANGE_PERIOD';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';

export const fetchSuccess = data => ({
  type: FETCH_SUCCESS,
  payload: data
});

export function fetchAPI() {
    return (dispatch, getState) => {
        const {ISIN, period} = getState()

        return API(ISIN, period)
            .then(data => {
                dispatch(fetchSuccess(data));
                return data;
            })
    };
}