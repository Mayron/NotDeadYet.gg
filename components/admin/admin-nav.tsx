import { css } from "@emotion/react";
import media from "../../styles/media-queries";
import Route from "../route";

const AdminNav: React.FC = () => (
  <ul
    css={css`
      list-style: none;
      display: flex;
      margin-left: 0;
      margin-bottom: 0.5em;
      justify-content: space-between;
      align-items: center;
      margin-top: 1.2em;
      font-size: 0.95rem;

      ${media.down("sm")`

        text-align: center;
      `};
    `}
  >
    <li>
      <Route to="/admin">
        <span>
          New
          <span className="sm-up" style={{ paddingLeft: 4 }}>
            Applicants
          </span>
        </span>
      </Route>
    </li>
    <li>
      <Route to="/admin/unconfirmed">
        <span>
          Unconfirmed
          <span className="md-up" style={{ paddingLeft: 4 }}>
            Members
          </span>
        </span>
      </Route>
    </li>
    <li>
      <Route to="/admin/declined">
        <span>
          Declined
          <span className="md-up" style={{ paddingLeft: 4 }}>
            Applicants
          </span>
        </span>
      </Route>
    </li>
    <li>
      <Route to="/admin/accepted">
        <span>
          <span className="sm-up" style={{ paddingRight: 4 }}>
            Guild
          </span>
          Members
        </span>
      </Route>
    </li>
  </ul>
);

export default AdminNav;
