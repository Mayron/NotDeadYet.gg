import { css } from "@emotion/react";
import Route from "../route";

const AdminNav: React.FC = () => (
  <ul
    css={css`
      list-style: none;
      display: flex;
      margin-left: 0;
      margin-bottom: 10px;
      justify-content: space-between;
      margin-top: 40px;
    `}
  >
    <li>
      <Route text="New Applicants" to="/admin" />
    </li>
    <li>
      <Route text="Unconfirmed Members" to="/admin/unconfirmed" />
    </li>
    <li>
      <Route text="Declined" to="/admin/declined" />
    </li>
    <li>
      <Route text="Guild Members" to="/admin/accepted" />
    </li>
  </ul>
);

export default AdminNav;
