import "./MemberTable.css"
function MemberTable() {
  return(
    <table>
        
        <tbody>
            <tr>
                <td></td>
                <td>Ninja</td>
                <td>Asma Ad</td>
                <td>120</td>
                <td>
                    <button class="view">권한</button>
                    <button class="delete">차단</button>
                </td>
            </tr>
            <tr>
                <td></td>
                <td>Ninja</td>
                <td>Asma Ad</td>
                <td>120</td>
                <td>
                    <button class="view">권한</button>
                    <button class="delete">차단</button>
                </td>
            </tr>

            
        </tbody>
        <tfoot>
            <td colspan="5" class="tablefoot"></td>
        </tfoot>
    </table>
  )
}

export default MemberTable;