export interface QueueLogsAttributes {
    userId ?: string;
    userName ?: string;
    message ?: string;
    data ?: object;
    additionalData ?: object;
    updatedAt ?: Date;
    createdAt ?: Date;
}

export function queueLogsModel(mongoose) {
    const queueSchema = mongoose.Schema({
        userId: {
            type: String,
            required: true,
        },
        userName: {
            type: String
        },
        message: {
            type: String,
            required: true,
        },
        data: {
            type: Object,
            required: true,
        },
        additionalData: {
            type: Object
        },
        updatedAt: {
            type: Date,
            default: new Date()
        },
        createdAt: {
            type: Date,
            default: new Date()
        }
    });

    queueSchema.index({ userId: 1 });

    return mongoose.model('queueLogs', queueSchema);
}
