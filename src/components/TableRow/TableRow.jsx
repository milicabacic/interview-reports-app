import insight from "../../images/insight.png";
import "./tableRow.scss";

const TableRow = () => {
  return (
    <div className="table-row">
      <tr>
        <td>Company</td>
        <td>Interview Date</td>
        <td>Status</td>
        <td id="insight"><img src={insight}></img></td>
      </tr>
    </div>
  );
};

export default TableRow;
