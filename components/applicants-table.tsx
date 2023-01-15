import styled from "@emotion/styled";
import { css } from "@emotion/react";
import {
  Checkbox,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import {
  DataGrid,
  type GridValueGetterParams,
  type GridColDef,
  GridCellParams,
} from "@mui/x-data-grid";
import moment from "moment";
import { useState } from "react";
import vars from "../styles/vars";

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

interface ILootSheetsDropDownProps {
  app: IApplication;
  initialLoot: number[];
}

const LootSheetValue = styled.p`
  font-weight: ${vars.font.standard.weights.medium};
  text-align: center;
`;

const LootSheetsDropDown: React.FC<ILootSheetsDropDownProps> = ({ app, initialLoot }) => {
  const [loot, setLoot] = useState<number[]>(initialLoot);

  const handleChange = async (e: SelectChangeEvent<number[]>) => {
    const value = e.target.value as number[];
    setLoot(value);

    await fetch(`/api/applicant/loot`, {
      method: "POST",
      body: JSON.stringify({
        userId: app.userId,
        loot: value,
      }),
    });
  };

  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <Select<number[]>
        labelId={`lootList-${app.userId}`}
        multiple
        value={loot}
        displayEmpty
        renderValue={(selected) => {
          if (selected.length > 0) {
            return <LootSheetValue>{selected.length}</LootSheetValue>;
          }

          return <LootSheetValue>None</LootSheetValue>;
        }}
        onChange={handleChange}
      >
        <MenuItem value={1}>
          <Checkbox checked={loot.includes(1)} />
          <ListItemText primary="Phase 1" secondary="Naxx, OS, EoE (25/10)" />
        </MenuItem>
        <MenuItem value={2}>
          <Checkbox checked={loot.includes(2)} />
          <ListItemText primary="Phase 2" secondary="Ulduar (10)" />
        </MenuItem>
        <MenuItem value={3}>
          <Checkbox checked={loot.includes(3)} />
          <ListItemText primary="Phase 2" secondary="Ulduar (25)" />
        </MenuItem>
      </Select>
    </FormControl>
  );
};

const columns: GridColDef[] = [
  {
    field: "character",
    headerName: "Main Character",
    width: 150,
    valueGetter: ({ row }: GridValueGetterParams) => {
      const application = row as IApplication;
      const characterName = application.characters[0].name;
      return characterName;
    },
    renderCell: ({ row }) => {
      const app = row as IApplication;
      const characterName = app.characters[0].name;
      const userIdUrlSegment = encodeURIComponent(app.userId);

      return (
        <div>
          <a href={`/admin/applicant/${userIdUrlSegment}`}>
            <span style={{ textDecoration: "underline" }}>{characterName}</span>
          </a>
          <span className="user-id">{app.userId}</span>
        </div>
      );
    },
  },
  {
    field: "mainSpec",
    headerName: "Main-Spec",
    width: 120,
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
    width: 120,
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
    width: 170,
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
        prof1Name = `${mainCharacter.professions[0].name} (${mainCharacter.professions[0].level})`;
        prof2Name = `${mainCharacter.professions[1].name} (${mainCharacter.professions[1].level})`;
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
    minWidth: 200,
    flex: 1,
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
    field: "age",
    headerName: "Created",
    width: 150,
    valueGetter: ({ row }: GridValueGetterParams) => {
      const application = row as IApplication;

      if (application.createdAt) {
        const value = moment(application.createdAt).fromNow();
        return value;
      }

      return "";
    },
  },
  {
    field: "status",
    headerName: "Submitted Loot Lists",
    align: "center",
    width: 180,
    renderCell: ({ row }) => {
      const app = row as IApplication;

      if (typeof app.loot === "boolean") {
        app.loot = [];
      }

      const loot = app.loot || [];
      return <LootSheetsDropDown app={app} initialLoot={loot} />;
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
  hiddenColumns?: string[];
}

const ApplicantsTable: React.FC<IApplicantsTableProps> = ({
  data,
  hiddenColumns = ["status"],
}) => {
  const rows = data
    .sort((a, b) => (a.characters[0].name < b.characters[0].name ? -1 : 1))
    .map((app, index) => ({ id: index, ...app }));

  let columnsToShow = [...columns];

  if (hiddenColumns) {
    hiddenColumns.forEach((hidden) => {
      columnsToShow = columnsToShow.filter((v) => v.field !== hidden);
    });
  }

  return (
    <div
      css={css`
        width: 100%;
        height: 577px;

        .MuiDataGrid-cell:focus,
        .MuiDataGrid-cell:focus-within,
        .MuiDataGrid-columnHeader:focus,
        .MuiDataGrid-columnHeader:focus-within {
          outline: none !important;
        }

        div[role="row"] {
          div:last-child .MuiDataGrid-columnSeparator--sideRight {
            display: none;
          }
        }

        .discordId {
          font-size: 0.8rem;
        }
      `}
    >
      <DataGrid
        style={{ border: "none" }}
        isRowSelectable={() => false}
        rows={rows}
        columns={columnsToShow}
        pageSize={25}
        getCellClassName={(params) => getCellClassName(params)}
      />
    </div>
  );
};

export default ApplicantsTable;
