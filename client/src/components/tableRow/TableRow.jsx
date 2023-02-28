import './TableRow.css'

const TableRow = ({title, dept, status}) => {
    const statusClass = status === 'review' ? 'status purple' : status === 'in progress' ? 'status pink' : 'status orange'
    return (
        <tr>
            <td>{title}</td>
            <td>{dept}</td>
            <td>
                <span className={statusClass}></span>
                {status}
            </td>
        </tr>
    )
}

export default TableRow