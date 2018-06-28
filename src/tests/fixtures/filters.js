import moment from 'moment';

const defaultFilters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

const altFilters = {
    text: 'ee',
    sortBy: 'amount',
    startDate: moment(0),
    endDate: moment(0).add(3, 'days')
/*     startDate: moment().startOf('month'),
    endDate: moment().endOf('month') */
};

export { defaultFilters, altFilters };