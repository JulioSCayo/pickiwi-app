export class Record {
    user_id?: String;
    company?: String;
    kiwi_type?: String;
    smoko_time?: Number;
    lunch_time?: Number;
    hours?: Number;
    bins!: Number;
    hour_payment?: Number;
    bin_payment!: Number;
    members!: Number;
    payment!: Number;
    payment_day?: Date;
    paid?: Boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
