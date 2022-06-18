import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import './ImageUpload.css';
import logoImage from './../../../assets/images/logo-image.png'
import {Button} from "./Buttons";

interface Props {
    id: string;
    onInput: any;
    center?: boolean;
    errorText: string;
}


export const ImageUpload = (props: Props) => {
    const [file, setFile] = useState<Blob | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer | null>();
    const [isValid, setIsValid] = useState(false);


    useEffect(() => {
        if (!file) {
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    }, [file]);

    const filePickerRef = useRef<HTMLInputElement>(null);

    const pickedHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let pickedFile;
        let fileIsValid = isValid;
        if (e.target.files && e.target.files.length === 1) {
            pickedFile = e.target.files[0];
            if (pickedFile === undefined) return;
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        } else {
            setIsValid(false);
            fileIsValid = false;

        }
        props.onInput(props.id, pickedFile, fileIsValid);
    };


    const pickImageHandler = () => {
        if (filePickerRef.current) {
            filePickerRef.current.click();
        }

    };

    return (
        <div className="form-control">
            <input
                id={props.id}
                ref={filePickerRef}
                style={{display: 'none'}}
                type="file"
                accept=".jpg,.png,.jpeg"
                onChange={pickedHandler}
            />
            <div className={`image-upload ${props.center && 'center'}`}>
                <div className="image-upload__preview">
                    {previewUrl && <img src={previewUrl as string} alt="Preview logo image"/>}
                    {!previewUrl && <img src={logoImage} alt="Preview logo image"/>}
                </div>
                <Button type="button" onClick={pickImageHandler}>
                    PICK IMAGE
                </Button>
            </div>
            {!isValid && <p>{props.errorText}</p>}
        </div>
    );
};


