import moment from 'moment';

export default [{
    id: '1',
    description: 'gum',
    note: '',
    amount: 1234,
    createdAt: 0
}, {
    id: '2',
    description: 'Rent',
    note: 'test',
    amount: 1212341,
    createdAt: moment(0).subtract(4, 'days').valueOf()
}, {
    id: '3',
    description: 'Credit Card',
    amount: 4503,
    createdAt: moment(0).add(4, 'days').valueOf()
}];