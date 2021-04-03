import compileTemplate from 'lodash.template';
import template from '!!raw-loader!./tcx.xml.erb';
import { Activity } from '../../models/activity';
import { prepare } from './prepare';
import { cleanupEmptyLines } from '../cleanup-empty-lines';

const compiled = compileTemplate(template);

function encode(activity: Activity) {
  return  cleanupEmptyLines(
            compiled(
              { activity: prepare(activity) }
            )
          );
}

export { encode };
