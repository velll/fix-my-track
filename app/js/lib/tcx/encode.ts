import compileTemplate from 'lodash.template';
import template from '!!raw-loader!./tcx.xml.erb';
import { Activity } from '../../models/activity';
import { prepare } from './prepare';

const compiled = compileTemplate(template);

function encode(activity: Activity) {
  return compiled({activity: prepare(activity)});
}

export { encode };
