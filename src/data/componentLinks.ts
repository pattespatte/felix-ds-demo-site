// Deep links from the per-page component note to the felix-ds playground.
// Slugs and anchors mirror the playground's navigation.ts single source of
// truth (https://github.com/pattespatte/felix-ds), so "#/<slug>/<anchor>"
// resolves to the demo of each component.

export interface ComponentLink {
    /** FKUI component name as written in templates. */
    name: string
    /** Swedish title of the playground section the link points to. */
    title: string
    /** Deep link to the component's demo in the playground. */
    url: string
}

const PLAYGROUND_BASE = 'https://pattespatte.github.io/felix-ds/#/'

// name: [playground "slug/anchor", Swedish section title]
const COMPONENT_PATHS: Record<string, [string, string]> = {
    FBadge: ['aterkoppling/fbadge', 'Brickor'],
    FButton: ['knappar/fbutton', 'Knappar'],
    FCard: ['ytor/fcard', 'Kort'],
    FCheckboxField: ['formular/fcheckboxfield', 'Kryssruta'],
    FConfirmModal: ['modaler/fconfirmmodal', 'Bekräftelsedialog'],
    FDataTable: ['tabeller/fdatatable', 'Datatabell'],
    FDatepickerField: ['kalender/fdatepickerfield', 'Datumfält'],
    FEmailTextField: ['formular/femailtextfield', 'E-postfält'],
    FExpandableParagraph: ['ytor/fexpandableparagraph', 'Expanderbar paragraf'],
    FFieldset: ['formular/ffieldset', 'Fältset'],
    FFileItem: ['filer/ffileitem', 'Filrad'],
    FFileSelector: ['filer/ffileselector', 'Filväljare'],
    FIcon: ['knappar/ficon', 'Ikoner'],
    FMessageBox: ['ytor/fmessagebox', 'Meddelanderutor'],
    FModal: ['modaler/fmodal', 'Modal'],
    FPaginator: ['tabeller/fpaginator', 'Paginering'],
    FPersonnummerTextField: ['formular/fpersonnummertextfield', 'Personnummer'],
    FPhoneTextField: ['formular/fphonetextfield', 'Telefonfält'],
    FProgressbar: ['aterkoppling/fprogressbar', 'Förlopp'],
    FRadioField: ['formular/fradiofield', 'Radioknappar'],
    FSearchTextField: ['formular/fsearchtextfield', 'Sökfält'],
    FSelectField: ['formular/fselectfield', 'Rulllista'],
    FSortFilterDataset: ['tabeller/fsortfilterdataset', 'Sök och sortera'],
    FTextField: ['formular/ftextfield', 'Textfält'],
    FTextareaField: ['formular/ftextareafield', 'Textruta'],
    FValidationForm: ['formular/fvalidationform', 'Valideringsformulär']
}

export const componentLinks: Record<string, ComponentLink> = Object.fromEntries(
    Object.entries(COMPONENT_PATHS).map(([name, [path, title]]) => [
        name,
        { name, title, url: `${PLAYGROUND_BASE}${path}` }
    ])
)
