import { ConnectionConfig } from 'mysql';

export class Config {

    /**
     * This skeleton file works as a template.
     * Copy this file ill in the information in the mysqlOptions-object and save it as a typescript file: "config.ts"
     * Don't forget to compile it into JavaScript after saving. The name of the file should not be touched!
     * It is marked to be ignored by git since it is a system-specific configuration and should
     * not be overwritten by other team members.
     * You can remove this comment from the ts file afterwards.


     */
        //Verbindung zu Datenbank aufbauen
    public static mysqlOptions: ConnectionConfig = {

        database: "newsletter",
        host: "localhost",
        user: "root",
    };

}