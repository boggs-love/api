import Sequalize from 'sequelize';
import ssaclAttributeRoles from 'ssacl-attribute-roles';

const sequalize = new Sequalize(process.env.DATABASE_URL);

// @TODO This breaks associations.
// ssaclAttributeRoles(sequalize);

export default sequalize;
