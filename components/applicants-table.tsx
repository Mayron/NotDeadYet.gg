import styled from "@emotion/styled";
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
import { useMemo, useState } from "react";
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

const LootListCell = styled.div`
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
    p {
      color: white;
    }
  }
`;

const GridContainer = styled.div`
  width: 100%;
  min-height: 577px;

  .MuiDataGrid-root,
  .MuiDataGrid-virtualScroller {
    min-height: 577px;
    height: 100%;
  }

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
`;

const LootSheetValue = styled.p`
  font-weight: ${vars.font.standard.weights.medium};
  text-align: center;
`;

interface ILootSheetsDropDownProps {
  app: IApplication;
  applications: IApplication[];
  setApplications: (value: IApplication[]) => void;
}

const LootSheetsDropDown: React.FC<ILootSheetsDropDownProps> = ({
  app,
  applications,
  setApplications,
}) => {
  const loot = app.loot || [];

  const handleChange = async (e: SelectChangeEvent<number[]>) => {
    const newLoot = e.target.value as number[];
    app.loot = newLoot;

    const updatedApplications = applications.map((a) => {
      if (a.userId === app.userId) {
        return {
          ...a,
          loot: newLoot,
        };
      }

      return a;
    });

    await fetch(`/api/applicant/loot`, {
      method: "POST",
      body: JSON.stringify({
        userId: app.userId,
        loot: newLoot,
      }),
    });

    setApplications(updatedApplications);
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
          <ListItemText primary="Phase 1 - 25 Man" secondary="Naxx, OS, EoE" />
        </MenuItem>
        <MenuItem value={1.5}>
          <Checkbox checked={loot.includes(1.5)} />
          <ListItemText primary="Phase 1 - 10 Man" secondary="Naxx, OS, EoE" />
        </MenuItem>
        <MenuItem value={2}>
          <Checkbox checked={loot.includes(2)} />
          <ListItemText primary="Phase 2 - 25 Man" secondary="Ulduar" />
        </MenuItem>
        <MenuItem value={2.5}>
          <Checkbox checked={loot.includes(2.5)} />
          <ListItemText primary="Phase 2 - 10 Man" secondary="Ulduar" />
        </MenuItem>
      </Select>
    </FormControl>
  );
};

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
  const initialState = data
    .sort((a, b) => (a.characters[0].name < b.characters[0].name ? -1 : 1))
    .map((app, index) => ({ id: index, ...app } as IApplication));

  const [applications, setApplications] = useState(initialState);

  const columns: GridColDef[] = useMemo(
    () => [
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
        sortable: false,
        valueGetter: ({ row }: GridValueGetterParams) => {
          const application = row as IApplication;
          return application.loot;
        },
        renderCell: ({ row }: GridCellParams) => {
          const { userId } = row as IApplication;
          const app = applications.find((a) => a.userId === userId) as IApplication;

          return (
            <LootListCell>
              <LootSheetsDropDown
                app={app}
                applications={applications}
                setApplications={setApplications}
              />
            </LootListCell>
          );
        },
      },
    ],
    [applications],
  );

  let columnsToShow = [...columns];

  if (hiddenColumns) {
    hiddenColumns.forEach((hidden) => {
      columnsToShow = columnsToShow.filter((v) => v.field !== hidden);
    });
  }

  return (
    <GridContainer>
      <DataGrid
        autoHeight
        style={{ border: "none" }}
        isRowSelectable={() => false}
        rows={initialState}
        columns={columnsToShow}
        pageSize={25}
        disableVirtualization
        getCellClassName={(params) => getCellClassName(params)}
      />
    </GridContainer>
  );
};

export default ApplicantsTable;
