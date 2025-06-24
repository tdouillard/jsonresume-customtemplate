const pptr = require("puppeteer");
const express = require("express");
const process = require("process");

async function buildPdf() {
    const app = express();
    app.use(express.static("./public"));
    const pdfpath = process.env.PDF_PATH || "./resume.pdf"
    let listener = app.listen(0, "127.0.0.1", async () => {
        const browser = await pptr.launch();
        const page = await browser.newPage();
        await page.emulateMediaType("print");
        await page.goto(
            `http://localhost:${listener.address().port}/index.html`,
            { waitUntil: "networkidle0" }
        );
        await page.pdf({
            path: "./resume.pdf",
            format: "A4",
            printBackground: true,
        });
        await browser.close();
        console.info(`Pdf generated successfully at ${pdfpath}`);
        listener.close();
    });
}

if (require.main === module) buildPdf();