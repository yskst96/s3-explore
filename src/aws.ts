import AWS from "aws-sdk"

const config = new AWS.Config(
    { accessKeyId: process.env.REACT_APP_KEY_ID, secretAccessKey: process.env.REACT_APP_SECRET_KEY }
);

AWS.config.update(config)

const s3 = new AWS.S3()

const BUCKET = "yskst96-common"

const s3list = async () => {
    const res = await s3.listObjectsV2({ Bucket: BUCKET }).promise()

    console.log(res);

}

const s3get = async (key: string) => {
    const res = await s3.getObject({ Bucket: BUCKET, Key: key }).promise()
    console.log(res);
    const obj = res.Body as Uint8Array

    const downLoadLink = document.createElement("a");
    downLoadLink.download = key
    downLoadLink.href = URL.createObjectURL(new Blob([obj.buffer]));
    downLoadLink.dataset.downloadurl = [downLoadLink.download, downLoadLink.href].join(":");
    downLoadLink.click();

}

const s3put = async (key: string, body: Uint8Array) => {
    const res = await s3.putObject({ Bucket: BUCKET, Key: key, Body: body }).promise()
    console.log(res);
}

const s3delete = async (key: string) => {
    const res = await s3.deleteObject({ Bucket: BUCKET, Key: key }).promise()
    console.log(res);
}

export { s3list, s3get, s3put, s3delete }