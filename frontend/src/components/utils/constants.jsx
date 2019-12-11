
const constants = {
    departments: [
        { 'any': 'Any' },
        {'ACCT':'Accounting'},
        {'AGR':'Agriculture'},
        {'AHSS':'Arts/Humanities/Social Sci'},
        {'ANSC':'Animal Science'},
        {'ANTH':'Anthropology'},
        {'ARAB':'Arabic'},
        {'ARTH':'Art History'},
        {'ASCI':'Arts &amp; Sciences'},
        {'AVC':'Art &amp; Visual Culture'},
        {'BADM':'Business Administration'},
        {'BINF':'Bioinformatics'},
        {'BIOC':'Biochemistry'},
        {'BIOL':'Biology'},
        {'BIOM':'Biomedical Science'},
        {'BIOP':'Biophysics'},
        {'BIOT':'Biotechnology'},
        {'BOT':'Botany'},
        {'BUS':'Business'},
        {'CCJP':'Criminology/Criminal Justice'},
        {'CDE':'Capacity Development/Extension'},
        {'CHEM':'Chemistry'},
        {'CHIN':'Chinese'},
        {'CIS':'Computing &amp; Information Sci.'},
        {'CLAS':'Classical Studies'},
        {'CLIN':'Clinical Studies'},
        {'CME':'Commerce,Management&amp;Economics'},
        {'CONS':'Conservation Leadership'},
        {'COOP':'Co-Op Education'},
        {'CROP':'Crop Science'},
        {'CRWR':'Creative Writing'},
        {'CSTU':'Child Studies'},
        {'DAFL':'Agri-Food Leadership (diploma)'},
        {'DAGR':'Ag. &amp; Equine Studies (dip)'},
        {'DENM':'Environmental Mngt (diploma)'},
        {'DEQN':'Equine (Diploma)'},
        {'DFN':'Food &amp; Nutrition (diploma)'},
        {'DHRT':'Horticulture (diploma)'},
        {'DTM':'Turf Management (diploma)'},
        {'DVT':'Veterinary Technology (dip)'},
        {'ECON':'Economics'},
        {'ECS':'Early Childhood Studies'},
        {'EDRD':'Env. Design/Rural Development'},
        {'ENGG':'Engineering'},
        {'ENGL':'English'},
        {'ENVM':'Environmental Management'},
        {'ENVS':'Environmental Sciences'},
        {'EQN':'Equine'},
        {'EURO':'European Studies'},
        {'FARE':'Food, Agr &amp; Resource Economics'},
        {'FCSS':'Family/Community Social Servic'},
        {'FIN':'Finance'},
        {'FINA':'Fine Art'},
        {'FOOD':'Food Science'},
        {'FRAN':'Family Rel\'s/Applied Nutrition'},
        {'FREN':'French Studies'},
        {'FRHD':'Family Relations &amp; Human Dev.'},
        {'FSQA':'Food Safety &amp; Quality Assuranc'},
        {'GEOG':'Geography'},
        {'GERM':'German Studies'},
        {'GREK':'Greek Studies'},
        {'HHNS':'Human Health/Nutritional Sci'},
        {'HISP':'Hispanic Studies'},
        {'HIST':'History'},
        {'HK':'Human Kinetics'},
        {'HORT':'Horticultural Science'},
        {'HROB':'Human Resource/Organizat Behav'},
        {'HTM':'Hospitality &amp; Tourism Mngt'},
        {'HUMN':'Humanities'},
        {'IBIO':'Integrative Biology'},
        {'IDEV':'International Development Std.'},
        {'IMPR':'Improvisation'},
        {'INDG':'Indigenous Studies'},
        {'IPS':'Interdisciplinary Physical Sci'},
        {'ISS':'Interdisciplinary Social Sci.'},
        {'ITAL':'Italian Studies'},
        {'JUST':'Justice Studies'},
        {'KIN':'Kinesiology'},
        {'LACS':'Latin American/Caribbean St'},
        {'LARC':'Landscape Architecture'},
        {'LAT':'Latin'},
        {'LEAD':'Leadership'},
        {'LING':'Linguistics'},
        {'LTS':'Literary/Theatre Studies'},
        {'MATH':'Mathematics'},
        {'MBG':'Molecular Biology &amp; Genetics'},
        {'MCB':'Molecular &amp; Cellular Biology'},
        {'MCS':'Marketing &amp; Consumer Studies'},
        {'MDST':'Media Studies'},
        {'MGMT':'Management'},
        {'MICR':'Microbiology'},
        {'MUSC':'Music'},
        {'NANO':'Nanoscience'},
        {'NEUR':'Neuroscience'},
        {'NUTR':'Nutrition'},
        {'OAGR':'Organic Agriculture'},
        {'ONEH':'One Health'},
        {'PABI':'Pathobiology'},
        {'PATH':'Pathology'},
        {'PBIO':'Plant Biology'},
        {'PHIL':'Philosophy'},
        {'PHYS':'Physics'},
        {'PLNT':'Plant Agriculture'},
        {'POLS':'Political Science'},
        {'POPM':'Population Medicine'},
        {'PORT':'Portuguese'},
        {'PSYC':'Psychology'},
        {'REAL':'Real Estate &amp; Housing'},
        {'RPD':'Rural Planning &amp; Development'},
        {'RST':'Rural Studies'},
        {'SART':'Studio Art'},
        {'SCMA':'Science &amp; Math'},
        {'SOAN':'Sociology &amp; Anthropology'},
        {'SOC':'Sociology'},
        {'SOPR':'Social Practice'},
        {'SPAN':'Spanish'},
        {'STAT':'Statistics'},
        {'THST':'Theatre Studies'},
        {'TOX':'Toxicology'},
        {'TRMH':'Tourism and Hospitality'},
        {'UNIV':'Interdisciplinary University'},
        {'VETM':'Veterinary Medicine'},
        {'WMST':'Women\'s Studies'},
        {'XSEN':'Seneca College'},
        {'ZOO':'Zoology'}
    ],
    levels: [
        { 'any': 'Any' },
        { '010': 'Diploma - 1st Semester' },
        { '020': 'Diploma - 2nd Semester' },
        { '030': 'Diploma - 3rd Semester' },
        { '040': 'Diploma - 4th Semester' },
        { '100': 'First Year' },
        { '200': 'Second Year' },
        { '300': 'Third Year' },
        { '400': 'Fourth Year' },
        { '500': 'Graduate' },
        { '600': 'Graduate' },
        { '700': 'Graduate' },
        { '800': 'Graduate' },
        { '900': 'Transfer Credit' }
    ],
    emailRegex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g
}

export default constants

let reduceFn = (result, item, index) => {
    let value = Object.keys(item)[0]
    result[value] = item[value]
    return result
}

export const labels = {
    departments: constants.departments.reduce(reduceFn, {}),
    levels: constants.levels.reduce(reduceFn, {})
}