export class News {
    public header: string;
    public username: string;
    public text: string;
    public news_id: number;
    public date: Date;
    public time: any;

    constructor(header: string, username:string, text: string, news_id: number, date: Date, time: any) {
        this.header = header;
        this.username = username;
        this.text = text;
        this.news_id = news_id;
        this.date = date;
        this.time = time;
    }

}