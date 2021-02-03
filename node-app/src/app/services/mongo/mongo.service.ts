import { Helper } from './../helper/helper.service';

import { Types } from 'mongoose';


export class Mongo {
    helper: Helper;

    constructor(private config) {
        this.helper = new Helper(this.config);
    }

    post(model, data: Object = {}) {
        data['createdAt'] = new Date();
        data['updatedAt'] = new Date();

        return new model(data).save()
            .then( (dataVal) => {
                return dataVal || {};
            })
            .catch(
                (error) => error
            );
    }

    getId(model, id: string = '') {
        return model.findById(id)
            .then( (dataVal) => {
                return (dataVal) ? dataVal.toObject() : {};
            })
            .catch(
                (error) => error
            );
    }

    getOne(model, query: Object = {}) {
        if (this.helper.isNotEmpty(query['_id'])) {
            query['_id'] = Types.ObjectId(query['_id']);
        }

        return model.findOne(query).sort({'$natural': -1 })
            .then( (dataVal) => {
                return (dataVal) ? dataVal.toObject() : {};
            })
            .catch(
                (error) => error
            );
    }

    getAllField(model, query: Object = {}, field: string = '', limit: Number = 10) {
        return model.find(query, (field !== '') ? field : null).sort({'$natural': -1}).limit(limit)
            .then( (dataValue) => {
                if (dataValue.length  >= 1) {
                    dataValue = dataValue.map( (dData) => {
                        return dData.toObject();
                    });
                }

                return dataValue;
            })
            .catch(
                (error) => error
            );
    }

    update(model, query: Object = {}, data: Object = {}) {
        data['updatedAt'] = new Date();

        if (this.helper.isNotEmpty(query['_id'])) {
            query['_id'] = Types.ObjectId(query['_id']);
        }

        return model.findOneAndUpdate(query, { $set: data}, { new: true })
            .then( (dataVal) => {
                return dataVal;
            })
            .catch(
                (error) => error
            );
    }

    delete(model, query: Object = {}) {
        if (this.helper.isNotEmpty(query['_id'])) {
            query['_id'] = Types.ObjectId(query['_id']);
        }

        return model.findOneAndRemove(query)
            .then( (dataVal) => {
                return dataVal;
            })
            .catch(
                (error) => error
            );
    }

    count(model, query: Object = {}) {
        return model.countDocuments(query)
            .then( (dataVal) => {
                return dataVal;
            })
            .catch(
                (error) => error
            );
    }
}
