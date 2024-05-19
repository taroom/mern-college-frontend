import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
const AppCRUD = () => {
    const [dataMahasiswa, setDataMahasiswa] = useState([]);
    //get data
    const getData = async () => {
        try {
            const {data} = await axios.get("http://localhost:3000/mahasiswa/get-data");
            console.log(data.data);
            setDataMahasiswa(data.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    //hapus data
    const deleteData = async (id) => {
        try {
            const response = axios.delete(`http://localhost:3000/mahasiswa/get-data/${id}`);       
            console.log(response);

            toast.success("Data berhasil dihapus");
            getData();
        } catch (error) {
            console.error(error);
        }
    }
  return <div>
        <div className="app-crud">
            <Link to="/add-data" className="tambah-data">Tambah Data</Link>

            <table>
                <tbody>
                    <tr>
                        <th>No</th>
                        <th>NPM</th>
                        <th>Nama Lengkap</th>
                        <th>Jurusan</th>
                        <th>Action</th>
                    </tr>
                    {dataMahasiswa.length === 0 ? (
                        <tr>
                            <td colSpan="5" style={{ fontWeight:"bold", fontSize: 
                                "25px", paddingTop:"10px", paddingBottom:"10px"
                            }}>Tidak ada data</td>
                        </tr>
                    ): (
                        <>
                        {dataMahasiswa.map((data, index) => {
                        return (
                            <tr key={data._id}>
                                <td style={{ fontWeight: "bold"}}>{index + 1}</td>
                                <td>{data.npm}</td>
                                <td>{data.nama}</td>
                                <td>{data.jurusan}</td>
                                <td>
                                    <Link to={`/edit-data/${data._id}`}>
                                        <i className="fa-solid fa-pen-to-square" title="Edit Data"></i>
                                    </Link>
                                    <i className="fa-solid fa-trash" title="Delete Data" onClick={() => {
                                        return confirm("Anda yakin?") ? deleteData(data._id):'';
                                    }}></i>
                                </td>
                            </tr>
                            
                        );
                    })}
                        </>
                    ) }
                    
                    
                </tbody>
            </table>
        </div>
    </div>
}

export default AppCRUD
