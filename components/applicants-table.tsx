import {
  DataGrid,
  type GridValueGetterParams,
  type GridColDef,
  GridCellParams,
} from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "discordId", headerName: "Discord ID", width: 150 },
  {
    field: "character",
    headerName: "Character",
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
    field: "prof1",
    headerName: "Prof #1",
    width: 150,
    valueGetter: ({ row }: GridValueGetterParams) => {
      if (row.primaryProfession1) {
        return row.primaryProfession1 as string;
      }

      const application = row as IApplication;
      if (!application.characters) {
        return "";
      }

      const data = application.characters[0].professions[0];
      return data.name;
    },
  },
  {
    field: "prof2",
    headerName: "Prof #2",
    width: 150,
    valueGetter: ({ row }: GridValueGetterParams) => {
      if (row.primaryProfession2) {
        return row.primaryProfession2 as string;
      }

      const application = row as IApplication;
      if (!application.characters) {
        return "";
      }

      const data = application.characters[0].professions[1];
      return data.name;
    },
  },
  {
    field: "alts",
    headerName: "Alts",
    valueGetter: ({ row }: GridValueGetterParams) => {
      const application = row as IApplication;
      if (!application.characters) {
        return "";
      }

      return application.characters.length - 1;
    },
  },
];

interface IApplicantsTableProps {
  data: IApplication[];
}

const ApplicantsTable: React.FC<IApplicantsTableProps> = ({ data }) => {
  const rows = data.map((app, index) => ({ id: index, ...app }));

  const getCellClassName = (params: GridCellParams) => {
    const app = params.row as IApplication;

    if (params.field === "character" && app.characters) {
      const wowClassName = app.characters[0].class.replace(/\s/g, "-").toLowerCase();
      return wowClassName;
    }

    return "";
  };

  return (
    <div style={{ width: "100%", height: 500 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={25}
        getCellClassName={(params) => getCellClassName(params)}
      />
    </div>
  );
};

export default ApplicantsTable;
