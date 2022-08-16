const {
    src,
    dest,
    parallel,
    series,
    watch}  = require('gulp');
// import fetch from "node-fetch";
let del = require('del');
const zip   = require('gulp-zip');

const paths = {

    package: {
        name:            'pkg.pl-PL.xml',
        path:            './pkg.pl-PL.xml',
        archiveName:     'pkg.pl-PL.zip',
        archiveNamePath: "./package/pkg.pl-PL.zip",
    },

    site: {
        archiveName:        'site_pl-PL.zip',
        archiveNamePath:    './package/site_pl-PL.zip',
    },

    administrator: {
        archiveName:       'admin_pl-PL.zip',
        archiveNamePath:   './package/admin_pl-PL.zip',
    }
}


function createArchiveSite()
{
    return src( './site/**/*.*' )
        .pipe( zip( paths.site.archiveName ) )
        .pipe( dest( './package/' ) );
}

function createArchiveAdministrator()
{
    return src( './admin/**/*.*' )
        .pipe( zip( paths.administrator.archiveName ) )
        .pipe( dest( './package/' ) );
}

function createArchivePackage()
{
    return src([
        paths.site.archiveNamePath,
        paths.administrator.archiveNamePath,
        paths.package.path
    ])
        .pipe( zip( paths.package.archiveName ) )
        .pipe( dest( './package/' ) );
}


function clean()
{
    return del([
        paths.package.archiveNamePath,
        paths.site.archiveNamePath,
        paths.administrator.archiveNamePath
    ]);
}

function cleanAfter()
{
    return del([
        paths.site.archiveNamePath,
        paths.administrator.archiveNamePath
        ]
    );
}

exports.default = series(
    clean,
    createArchiveSite,
    createArchiveAdministrator,
    createArchivePackage,
    cleanAfter
);

exports.administrator = series(
    clean,
    createArchiveAdministrator
)