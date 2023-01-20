import gql from 'graphql-tag';

export const GET_DAILY_READINGS_HAR = gql`
  query MyQuery {
    daily_readings {
      bore1hours
      bore1m3
      bore2hours
      bore2m3
      currentdate
      dateyesterday
      dayyesterday
      draindischarge
      electricityback
      electricityfront
      electricityfrontbore
      gas
      har1northdrainec
      har1northdrainmls
      har1northdrainph
      har1northdripec
      har1northdripmls
      har1northdripph
      har1southdrainec
      har1southdrainmls
      har1southdrainph
      har1southdripec
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
      har5northdripec
      har5northdripmls
      har5northdripph
      har5southdrainec
      har5southdrainmls
      har5southdrainph
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
      har2southdripph
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
    }
  }
`;
