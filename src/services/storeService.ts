import {CREATE_PRESIGNED_URL} from "@utils/endPoints";
import axios from "axios";

import {instanceaxiosApi} from "./axiosInterceptor";
import {
    PreSignedUrlInput,
    PreSignedUrlOutput
} from "@bikairproject/shared";

export const saveReportPhoto = async (photo: string, adminId = "unknown", bikeId = "unknown") => {
    const params: PreSignedUrlInput = {
        bucket_name: "report-photos",
        type: "image/jpeg",
        tags: {
            bike_id: bikeId,
            admin_id: adminId
        }
    };
    const {data} = await instanceaxiosApi.post<PreSignedUrlOutput>(CREATE_PRESIGNED_URL, params);

    await uploadToS3Bucket(data.fields, photo, data.url);

    return data.filename;
};


export const uploadToS3Bucket = async (fields: {[key: string]: string}, path: string, url: string) => {
    console.log("Uploading file to aws s3 bucket....");
    const formData = new FormData();
    Object.keys(fields).forEach(key => {
        formData.append(key, fields[key]);
    });
    formData.append("file",
        JSON.parse(JSON.stringify({ uri: path, type: fields["Content-Type"] ?? "image/jpeg", name: fields["key"] ?? "Unknown" }))
    );

    return await axios.post(url,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            },
        }
    );
};
