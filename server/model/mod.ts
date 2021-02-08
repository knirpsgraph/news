export class News {
    public news_id: number;
    public header: string;
    public text: string;
    public date: Date;

    constructor(news_id: number, header: string, text: string, date: Date) {
        this.news_id = news_id;
        this.header = header;
        this.text = text;
        this.date = date;
    }

}