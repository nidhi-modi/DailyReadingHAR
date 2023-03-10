import gql from 'graphql-tag';

export const INSERT_DAILY_READINGS_HAR = gql`
  mutation insertDailyReadings($objects: [daily_readings_insert_input!]!) {
    insert_daily_readings(objects: $objects) {
      returning {
        bore1hours
        bore1m3
        bore2hours
        bore2m3
        currentdate
        dateyesterday
        har1northdripec
        har1northdrainph
        har1northdrainmls
        har1northdrainec
        gas
        electricityfrontbore
        electricityfront
        electricityback
        draindischarge
        dayyesterday
        har1northdripmls
        har1northdripph
        har1southdrainec
        har1southdrainmls
        har1southdrainph
        har1southdripec
        har1southdripmls
        har1southdripph
        har2northdrainec
        har2northdrainmls
        har2northdrainph
        har2northdripec
        har2northdripmls
        har2northdripph
        har2southdrainec
        har2southdrainmls
        har2southdrainph
        har2southdripec
        har2southdripmls
        har2southdripph
        site_name
        har6southdripph
        har6southdripmls
        har6southdripec
        har6southdrainph
        har6southdrainmls
        har6southdrainec
        har6northdripph
        har6northdripmls
        har6northdripec
        har6northdrainph
        har6northdrainmls
        har6northdrainec
        har5southdripph
        har5southdripmls
        har5southdripec
        har5southdrainph
        har5southdrainmls
        har5southdrainec
        har5northdripph
        har5northdripmls
        har5northdripec
        har5northdrainph
        har5northdrainmls
        har5northdrainec
        har4southdripph
        har4southdripmls
        har4southdripec
        har4southdrainph
        har4southdrainmls
        har4southdrainec
        har4northdripph
        har4northdripmls
        har4northdripec
        har4northdrainph
        har4northdrainmls
        har4northdrainec
        har3southdripph
        har3southdripmls
        har3southdripec
        har3southdrainph
        har3southdrainmls
        har3southdrainec
        har3northdripph
        har3northdripmls
        har3northdripec
        har3northdrainph
        har3northdrainmls
        har3northdrainec
      }
    }
  }
`;
