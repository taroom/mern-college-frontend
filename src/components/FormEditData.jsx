import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const FormEditData = () => {
    const navigate = useNavigate();

    const [npm, setNpm] = useState("")
    const [nama, setNama] = useState("")
    const [jurusan, setJurusan] = useState("")

    const {id} = useParams();

    

    useEffect(() => {
        //getData By ID
        const getDataById = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/mahasiswa/get-data/${id}`);
                console.log(response);
                setNpm(response.data.data.npm);
                setNama(response.data.data.nama);
                setJurusan(response.data.data.jurusan);
            } catch (error) {
                console.error(error);
            }
        }
        
        getDataById();
    }, [id]);
  
    //update data
    const updateData = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/mahasiswa/get-data/${id}`, {
                npm,
                nama,
                jurusan
            });

            toast.success("Data berhasil di update");

            navigate("/");
        } catch (error) {
            console.error(error);
        }
    }


    return (
    <div className="form-add-data">
        <form onSubmit={updateData}>
            <table>
                <tbody>
                    <tr>
                        <td><label htmlFor="npm">NPM</label></td>
                        <td>
                            <input type="text" name="npm" id="npm" placeholder="Masukkan NPM" value={npm} onChange={(e) => setNpm(e.target.value)}  required disabled />
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
                            <button type="submit">Update Data</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    </div>
  )
}

export default FormEditData
