const S = require('fluent-json-schema');

const imageSchema = S.object()
  .prop('id', S.number())
  .prop('path', S.string())
  .prop('thumbnail', S.anyOf([S.string(), S.null()]))
  .prop('title', S.string())
  .prop('pos', S.number())
  .prop('orient', S.string());

const buildSchema = S.object()
  .id('#build')
  .prop('id', S.number())
  .prop('active', S.boolean())
  .prop('displayDate', S.string())
  .prop('startedDate', S.string().format(S.FORMATS.DATE_TIME))
  .prop('cpu', S.string())
  .prop('cool', S.anyOf([S.string(), S.null()]))
  .prop('mobo', S.string())
  .prop('ram', S.string())
  .prop('hdd', S.string())
  .prop('ssd', S.anyOf([S.string(), S.null()]))
  .prop('gpu', S.string())
  .prop('case', S.string())
  .prop('psu', S.string())
  .prop('image', imageSchema);

const projectSchema = S.object()
  .id('#project')
  .prop('id', S.number())
  .prop('active', S.boolean())
  .prop('title', S.string())
  .prop('webUrl', S.anyOf([S.string(S.FORMATS.URL), S.null()]))
  .prop('codeUrl', S.string(S.FORMATS.URL))
  .prop('displayDate', S.string())
  .prop('startedDate', S.string().format(S.FORMATS.DATE_TIME))
  .prop('lang', S.string())
  .prop('info', S.string())
  .prop('role', S.string())
  .prop('stat', S.string())
  .prop('images', S.array().items(imageSchema));

const resumeSchema = S.object()
  .id('#resume')
  .definition(
    'complex',
    S.array()
      .id('#complex')
      .items(
        S.object()
          .prop('url', S.string(S.FORMATS.URL))
          .prop('firstLine', S.array().items(S.string()))
          .prop('secondLine', S.array().items(S.array().items(S.string())))
          .prop('info', S.array().items(S.array().items(S.string()))),
      ),
  )
  .definition(
    'list',
    S.array()
      .id('#list')
      .items(
        S.object()
          .prop('mainItem', S.string())
          .prop('subItems', S.array().items(S.string())),
      ),
  )
  .prop('experience', S.ref('#complex'))
  .prop('education', S.ref('#complex'))
  .prop('skills', S.ref('#list'));

const resumeSummarySchema = S.object()
  .id('#resumeSummary')
  .prop(
    'languages',
    S.object()
      .prop('desktop', S.array().items(S.string()))
      .prop('web', S.array().items(S.string())),
  )
  .prop(
    'mostRecentJob',
    S.object()
      .prop('employed', S.boolean())
      .prop('company', S.string())
      .prop('url', S.string(S.FORMATS.URL))
      .prop('title', S.string())
      .prop('dates', S.array().items(S.string())),
  );

module.exports = S.object()
  .id('schema')
  .definition('image', imageSchema)
  .definition('build', buildSchema)
  .definition('project', projectSchema)
  .definition('resume', resumeSchema)
  .definition('resumeSummary', resumeSummarySchema);
