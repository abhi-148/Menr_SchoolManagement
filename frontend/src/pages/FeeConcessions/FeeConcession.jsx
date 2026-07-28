import { useEffect, useMemo, useState } from "react";
import AddFeeConcession from "./AddFeeConcession";
import {
  deleteFeeConcession,
  getFeeConcessions,
} from "../../services/feeConcessionService";

const FeeConcessions = () => {

  const [concessions, setConcessions] = useState([]);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [editData, setEditData] = useState(null);

  useEffect(() => {
    loadConcessions();
  }, []);

  const loadConcessions = async () => {

    try {

      setLoading(true);

      const res = await getFeeConcessions();

      setConcessions(res.data || []);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this concession?")) return;

    try {

      await deleteFeeConcession(id);

      loadConcessions();

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Delete Failed"
      );

    }

  };

  const filteredData = useMemo(() => {

    return concessions.filter((item) =>
      `${item.student_name}
       ${item.concession_name}
       ${item.concession_mode}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  }, [concessions, search]);

  const activeCount =
    concessions.filter(
      x => x.status === "ACTIVE"
    ).length;

  const totalValue =
    concessions.reduce(
      (sum, item) =>
        sum + Number(item.concession_value || 0),
      0
    );

      return (

<div className="p-6">

<div className="flex justify-between items-center mb-6">

<div>

<h1 className="text-3xl font-bold">
Fee Concessions
</h1>

<p className="text-gray-500">
Manage Student Scholarships & Concessions
</p>

</div>

<button

onClick={()=>{
setEditData(null);
setShowForm(true);
}}

className="bg-indigo-600 text-white px-5 py-2 rounded-lg"

>

+ Add Concession

</button>

</div>

<div className="grid md:grid-cols-3 gap-5 mb-6">

<div className="bg-white rounded-xl shadow p-5">

<h3>Total Concessions</h3>

<p className="text-3xl font-bold">

{concessions.length}

</p>

</div>

<div className="bg-white rounded-xl shadow p-5">

<h3>Active</h3>

<p className="text-3xl font-bold text-green-600">

{activeCount}

</p>

</div>

<div className="bg-white rounded-xl shadow p-5">

<h3>Total Value</h3>

<p className="text-3xl font-bold text-indigo-600">

₹ {totalValue}

</p>

</div>

</div>

{showForm && (

<AddFeeConcession

editData={editData}

onCancel={()=>{

setShowForm(false);

setEditData(null);

}}

onSuccess={()=>{

setShowForm(false);

setEditData(null);

loadConcessions();

}}

/>

)}

<div className="bg-white rounded-xl shadow">

<div className="p-5 border-b">

<input

type="text"

placeholder="Search..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="w-full md:w-80 border rounded-lg px-4 py-2"

/>

</div>

<div className="overflow-x-auto">

<table className="w-full">

<thead className="bg-gray-100">

<tr>

<th className="p-3 text-left">
Student
</th>

<th className="p-3 text-left">
Concession
</th>

<th className="p-3 text-left">
Mode
</th>

<th className="p-3 text-left">
Value
</th>

<th className="p-3 text-left">
Fee
</th>

<th className="p-3 text-left">
Status
</th>

<th className="p-3 text-center">
Action
</th>

</tr>

</thead>

<tbody>

{loading ? (

<tr>

<td
colSpan="7"
className="text-center p-6"
>

Loading...

</td>

</tr>

) : filteredData.length===0 ? (

<tr>

<td
colSpan="7"
className="text-center p-6"
>

No Data Found

</td>

</tr>

) : (

filteredData.map(item=>(

<tr
key={item.id}
className="border-t hover:bg-gray-50"
>

<td className="p-3">
{item.student_name}
</td>

<td className="p-3">
{item.concession_name}
</td>

<td className="p-3">
{item.concession_mode}
</td>

<td className="p-3">
{item.concession_value}
</td>

<td className="p-3">
₹ {item.total_amount}
</td>

<td className="p-3">
{item.status}
</td>

<td className="p-3 text-center">

<button

onClick={()=>{

setEditData(item);

setShowForm(true);

}}

className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"

>

Edit

</button>

<button

onClick={()=>handleDelete(item.id)}

className="bg-red-600 text-white px-3 py-1 rounded"

>

Delete

</button>

</td>

</tr>

))

)}

</tbody>

</table>

</div>

</div>

</div>

);

};

export default FeeConcessions;