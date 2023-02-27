import TableRow from '../tableRow/TableRow'
import './Table.css'

const Table = () => {
    return (
        <table width="100%">
            <thead>
                <tr>
                    <td>Project Title</td>
                    <td>Department</td>
                    <td>Status</td>
                </tr>
            </thead>
            <tbody>
                <TableRow title="UI/UX Design" dept="UI Team" status="review"/>
                <TableRow title="Web development" dept="Frontend" status="in progress"/>
                <TableRow title="Ushopp App" dept="Mobile Team" status="pending"/>
                <TableRow title="UI/UX Design" dept="UI Team" status="review"/>
                <TableRow title="Web development" dept="Frontend" status="in progress"/>
                <TableRow title="Ushopp App" dept="Mobile Team" status="pending"/>
                <TableRow title="UI/UX Design" dept="UI Team" status="review"/>
                <TableRow title="Web development" dept="Frontend" status="in progress"/>
                <TableRow title="Ushopp App" dept="Mobile Team" status="pending"/>
            </tbody>
        </table>
    )
}

export default Table