import styled from "@emotion/styled";
import { Button } from "@mui/material";
import {
  DataGrid,
  type GridValueGetterParams,
  type GridColDef,
  GridCellParams,
} from "@mui/x-data-grid";
import Route from "./route";

const StyledAlts = styled.div`
  display: flex;
  flex-wrap: wrap;

  span {
    &:not(:last-of-type)::after {
      content: ",";
      padding-right: 5px;
    }
  }
`;

const columns: GridColDef[] = [
  { field: "discordId", headerName: "Discord ID", width: 150 },
  {
    field: "character",
    headerName: "Main Character",
    width: 150,
    valueGetter: ({ row }: GridValueGetterParams) => {
      const application = row as IApplication;

      if (row.characterName) {
        return row.characterName as string;
      }

      const characterName = application.characters[0].name;

      return characterName;
    },
  },
  {
    field: "mainSpec",
    headerName: "Main-Spec",
    width: 150,
    valueGetter: ({ row }: GridValueGetterParams) => {
      if (row.characterMainSpec) {
        return row.characterMainSpec as string;
      }
      const application = row as IApplication;
      return application.characters[0].mainSpec;
    },
  },
  {
    field: "offSpec",
    headerName: "Off-Spec",
    width: 150,
    valueGetter: ({ row }: GridValueGetterParams) => {
      if (row.characterOffSpec) {
        return row.characterOffSpec as string;
      }

      const application = row as IApplication;
      if (!application.characters) {
        return "";
      }

      return application.characters[0].offSpec;
    },
  },
  {
    field: "professions",
    headerName: "Professions",
    filterable: false,
    width: 150,
    valueGetter: ({ row }) => {
      let prof1Name = "";
      let prof2Name = "";

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (row.primaryProfession1) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        prof1Name = row.primaryProfession1 as string;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        prof2Name = row.primaryProfession2 as string;
      } else {
        const application = row as IApplication;
        if (!application.characters) {
          return "";
        }

        const mainCharacter = application.characters[0];
        prof1Name = mainCharacter.professions[0].name;
        prof2Name = mainCharacter.professions[1].name;
      }

      return `${prof1Name}, ${prof2Name}`;
    },
    renderCell: ({ row }) => {
      let prof1Name = "";
      let prof2Name = "";

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (row.primaryProfession1) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        prof1Name = row.primaryProfession1 as string;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        prof2Name = row.primaryProfession2 as string;
      } else {
        const application = row as IApplication;
        if (!application.characters) {
          return "";
        }

        const mainCharacter = application.characters[0];
        prof1Name = mainCharacter.professions[0].name;
        prof2Name = mainCharacter.professions[1].name;
      }

      return (
        <span>
          {prof1Name}
          <br />
          {prof2Name}
        </span>
      );
    },
  },
  {
    field: "alts",
    headerName: "Alts",
    sortable: false,
    width: 200,
    valueGetter: ({ row }) => {
      const application = row as IApplication;

      if (!application.characters) {
        return "";
      }

      const value = application.characters
        .slice(1)
        .map((c) => c.name)
        .join(", ");

      return value;
    },
    renderCell: ({ row }) => {
      const application = row as IApplication;

      if (!application.characters) {
        return "";
      }

      return (
        <StyledAlts>
          {application.characters.map((c, i) => {
            if (i === 0) return "";

            const wowClassName = c.class.replace(/\s/g, "-").toLowerCase();
            return (
              <span key={c.name} className={wowClassName}>
                {c.name}
              </span>
            );
          })}
        </StyledAlts>
      );
    },
  },
  {
    field: "view",
    headerName: "",
    disableColumnMenu: true,

    hideSortIcons: true,
    renderCell: ({ row }) => {
      const app = row as IApplication;
      const userId = encodeURIComponent(app.userId);
      return (
        <Route to={`/admin/applicant/${userId}`}>
          <Button variant="outlined">View</Button>
        </Route>
      );
    },
  },
];
const getCellClassName = (params: GridCellParams) => {
  const app = params.row as IApplication;

  if (params.field === "character" && app.characters) {
    const wowClassName = app.characters[0].class.replace(/\s/g, "-").toLowerCase();
    return wowClassName;
  }

  return "";
};

interface IApplicantsTableProps {
  data: IApplication[];
}

const ApplicantsTable: React.FC<IApplicantsTableProps> = ({ data }) => {
  const rows = data.map((app, index) => ({ id: index, ...app }));

  return (
    <div style={{ width: "100%", height: 500 }}>
      <DataGrid
        isRowSelectable={() => false}
        rows={rows}
        columns={columns}
        pageSize={25}
        getCellClassName={(params) => getCellClassName(params)}
      />
    </div>
  );
};

export default ApplicantsTable;
