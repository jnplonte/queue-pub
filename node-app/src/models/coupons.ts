export interface CouponsAttributes {
    name ?: string;
    code ?: string;
    description ?: string;
    termsAndCondition ?: string;
    image ?: string;
    count ?: number;
    validityStartDate ?: Date;
    validity ?: number;
    active ?: boolean;
    additionalData ?: object;
    updatedAt ?: Date;
    createdAt ?: Date;
}

export function couponsModel(mongoose) {
    const couponSchema = mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true,
        },
        description: {
            type: String
        },
        termsAndCondition: {
            type: String
        },
        image: {
            type: String
        },
        count: {
            type: Number
        },
        validityStartDate: {
            type: Date,
            default: new Date()
        },
        validity: {
            type: Number,
            default: 10
        },
        active: {
            type: Boolean,
            default: true
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

    couponSchema.index({ code: 1 });

    return mongoose.model('coupons', couponSchema);
}
