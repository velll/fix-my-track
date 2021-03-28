import compileTemplate from 'lodash.template';
import template from '!!raw-loader!./tcx.xml.erb';
import { Activity } from '../../models/activity';

const compiled = compileTemplate(template);

function encode(activity: Activity) {
  return compiled({activity: activity});
}

export { encode };
