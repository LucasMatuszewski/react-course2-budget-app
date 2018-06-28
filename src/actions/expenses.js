import uuid from 'uuid';

// we make here NAMED EXPORTS (not default)

/***********
 * ACTIONS (action generators - functions to generate an Action)
 */

// ADD_EXPENSE ( property = default value )
export const addExpense = (
    {
        description = '',
        note = '',
        amount = 0,
        createdAt = 0
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(), // we use uuid - NPM library to generate RFC4122 UUIDs (we have to install and import it)
        description,
        note,
        amount,
        createdAt
    }
});

// REMOVE_EXPENSE
// const removeExpense = (id) => ({ // return object: {id: "UUID"}
export const removeExpense = ({ id } = {}) => ({ // return only UUID
    type: 'REMOVE_EXPENSE',
    id
    // expense: { id } // we don't need "expense: { }" here. We only want to pass id to delete it
});

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});