import { useState } from "react";
import useAppDispatch from "../../Store/hooks/dispatch";
import { downloadQuizzExcelExample, uploadExcelFile } from "../../Store/quizzSlice";
import Company from "../../Types/CompanyType";
import { FileUploader } from "react-drag-drop-files";

const excelFileTypes = ['XLS', 'XLSX'];

const QuizzUpload = ({company}: {company: Company}) => {
    const dispatch = useAppDispatch();
    const [file, setFile] = useState<File | null>(null);

    const handleChange = (file: File) => {
      setFile(file);
    };

    return (
        <div>
            <h1>Upload Quizz to {company.name}</h1>
            <br />
            {
                file ? <p>File: {file.name}<button className="btn btn-sm btn-danger ms-2" onClick={() => setFile(null)}>Remove</button> </p> : 
            
            <FileUploader handleChange={handleChange} multiple={false} types={excelFileTypes}/>
            }
            { file && <button className="btn btn-success" onClick={() => {
                dispatch(uploadExcelFile({companyId: company.id, file}));
            }}>Upload</button>}
            <br /><br />
            <p className="text-muted">
                Not sure what your excel file should look like <a href="#" onClick={() => dispatch(downloadQuizzExcelExample())}>Download Example</a>
            </p>

        </div>
    )
}

export default QuizzUpload;
