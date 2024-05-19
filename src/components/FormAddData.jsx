import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";
import {toast} from "react-toastify";

const FormAddData = () => {
    const navigate = useNavigate();

    const [npm, setNPM] = useState("");
    const [nama, setNama] = useState("");
    const [jurusan, setJurusan] = useState("");

    // data exist
    

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

    // add data function
    const addData = async (e) => {
        e.preventDefault();
        try {
            await dataMahasiswa.find((data) => {
                if(data.npm == npm){
                    return toast.error("Data sudah terdaftar");
                }
            });

            await axios.post("http://localhost:3000/mahasiswa/add-data", {
                npm,
                nama,
                jurusan
            });

            toast.success("Data berhasil di tambahkan");

            navigate("/");
        } catch (error) {
            console.error(error);
        }
    }
  return (
    <div className="form-add-data">
        <form onSubmit={addData}>
            <table>
                <tbody>
                    <tr>
                        <td><label htmlFor="npm">NPM</label></td>
                        <td>
                            <input type="text" name="npm" id="npm" placeholder="Masukkan NPM" value={npm} onChange={(e) => setNPM(e.target.value)} required />
                        </td>
                    </tr>
                    <tr>
                        <td><label htmlFor="nama">Nama</label></td>
                        <td>
                            <input type="text" name="nama" id="nama" placeholder="Masukkan Nama Mahasiswa" value={nama} onChange={(e) => setNama(e.target.value)} required />
                        </td>
                    </tr>
                    <tr>
                        <td><label htmlFor="jurusan">Jurusan</label></td>
                        <td>
                            <select name="jurusan" id="jurusan" value={jurusan} onChange={(e) => setJurusan(e.target.value)} required>
                                <option value="">...</option>
                                <option value="Teknik Informatika">Teknik Informatika</option>
                                <option value="Sistem Informasi">Sistem Informasi</option>
                                <option value="Teknik Komputer">Teknik Komputer</option>
                                <option value="Desain Komunikasi Visual">Desain Komunikasi Visual</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td className="btn">
                            <button onClick={() => navigate("/")}>Kembali</button>
                            <button type="submit">Tambah Data</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    </div>
  )
}

export default FormAddData
