import { useEffect, useState, useRef } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./style.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import api from "../../services/api";

function Home() {
  const [products, setProducts] = useState([]);

  const inpuName = useRef();
  const inpuCategory = useRef();
  const inpuAmount = useRef();

  async function getProducts() {
    const productsApi = await api.get("/products");

    setProducts(productsApi.data);
  }

  async function createProducts() {
    await api.post("/products", {
      name: inpuName.current.value,
      category: inpuCategory.current.value,
      amount: inpuAmount.current.value,
    });
    getProducts();
  }

  async function deleteProducts(id) {
    await api.delete(`/products/${id}`);
    getProducts();
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container">
      <form>
        <h1>Cadastrar Produto</h1>
        <input
          placeholder="Nome Produto"
          name="product"
          type="text"
          ref={inpuName}
        />
        <input
          placeholder="Categoria"
          name="category"
          type="text"
          ref={inpuCategory}
        />
        <input
          placeholder="Valor"
          name="amount"
          type="number"
          ref={inpuAmount}
        />
        <button onClick={createProducts}>Salvar</button>
      </form>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nome do Produto</TableCell>
                <TableCell align="right">Categoria</TableCell>
                <TableCell align="right">Valor R$</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow
                  key={product.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {product.name}
                  </TableCell>
                  <TableCell align="right">{product.category}</TableCell>
                  <TableCell align="right">{product.amount}</TableCell>
                  <TableCell align="right">
                    <EditIcon color="primary" />
                    <DeleteIcon color="error" onClick={() => deleteProducts(product.id)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Home;
