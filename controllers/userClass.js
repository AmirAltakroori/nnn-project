/*
 *     NNN website.
 *
 *     This file is part of the NNN website.
 *
 *     Authors:
 *     Qusai Hroub <qusaihroub.r@gmail.com>
 *
 *     File description:
 */

export class User {
    constructor() {
        this.id = "";
        this.firstName = "";
        this.lastName = "";
        this.userName = "";
        this.email = "";
        this.password = "";
        this.token = "";
        this.roleId = 0;
        this.isActive = false;
        this.createDate = Date();
    }
}