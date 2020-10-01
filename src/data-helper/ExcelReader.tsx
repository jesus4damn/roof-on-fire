import { Component } from "react";
import * as React from "react";
import * as XLSX from 'xlsx';
import { make_cols } from "./MakeColumns";

const SheetJSFT = [
  "xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
].map(function (x) { return "." + x; }).join(",");

class ExcelReader extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      file: {},
      data: [],
      cols: []
    }
    this.handleFile = this.handleFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e: { target: { files: any; }; }) {
    const files = e.target.files;
    if (files && files[0]) this.setState({ file: files[0] });
  };

  handleFile() {
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;

    reader.onload = (e) => {
      //@ts-ignore
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA: true });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      this.setState({ data: data, cols: make_cols(ws['!ref']) }, () => {
        //@ts-ignore
        console.log(JSON.stringify(this.state.data, null, 2));
      });

    };

    if (rABS) {
      //@ts-ignore
      reader.readAsBinaryString(this.state.file);
    } else {
      //@ts-ignore
      reader.readAsArrayBuffer(this.state.file);
    };
  }
  render() {
    return (
      <div>
        <label htmlFor="file">Upload an excel to Process Triggers</label>
        <br />
        <input type="file" className="form-control" id="file" accept={SheetJSFT} onChange={this.handleChange} />
        <br />
        <input type='submit'
          value="Process Triggers"
          onClick={this.handleFile} />
      </div>
    )
  }
}

export default ExcelReader;
