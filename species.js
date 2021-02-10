const fs = require('fs');
const PATH = require('path');

const data = require('./data.json');

function create(name, age) {
    const id = users.length + 1;
    data.push({id, name, age});

    return data[data.length-1];
}

function deldata(id) {
    const index = data.findIndex(data => data.id === id);
    const data = data.splice(index, index);
    return data;
}

function update(id, age, name) {
    try {
        const data = data.find(data => data.id === id);
        if (age.length === 0) {
        } else {
            data.age = age;
        }
        if (name.length === 0) {
        } else {
            data.name = name;
        }
        return {data: data, err: undefined};
    } catch (err) {
        return {err, user: data}
    }
}

function get(id) {
    return data.find(data=> data.id === id);
}

module.exports = {
    users,
    create,
    delete: deldata,
    update,
    get
};