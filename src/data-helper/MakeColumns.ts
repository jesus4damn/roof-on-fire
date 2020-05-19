import * as XLSX from 'xlsx';


export const make_cols = (refstr: any) => {
	let o = [], C = XLSX.utils.decode_range(refstr).e.c + 1;
	for(let i = 0; i < C; ++i) o[i] = {name:XLSX.utils.encode_col(i), key:i}
	return o;
};
