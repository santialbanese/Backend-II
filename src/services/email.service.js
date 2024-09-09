import nodemailer from "nodemailer";
import path from "path";
import { deleteFile } from "../utils/fileSystem.js";
import paths from "../utils/paths.js";

export default class EmailService {
    #nodemailer;

    constructor() {
        this.#nodemailer = nodemailer;
    }

    #createTransport() {
        return this.#nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_PORT === "465",
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD,
            },
        });
    }

    async send(to, subject, content, filename) {
        const transport = this.#createTransport();
        const attachments = [];

        if (filename) {
            attachments.push({
                filename,
                path: path.join(paths.images, filename),
            });
        }

        await transport.sendMail({
            from: process.env.SMTP_EMAIL,
            to,
            subject,
            html: content,
            attachments,
        });

        if (filename) {
            await deleteFile(paths.images, filename);
        }
    }
}