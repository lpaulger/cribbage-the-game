module.exports = {
  options: {
    dir: 'dist',
    commit: true,
    push: true,
    message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
  },
  pages: {
    options: {
      remote: 'https://' + process.env.GH_TOKEN + '@github.com/lpaulger/cribbage-the-game.git',
      branch: 'gh-pages'
    }
  },
  heroku: {
    options: {
      remote: 'https://' + process.env.HEROKU_TOKEN + '@heroku.com:cribbage-the-game.git',
      branch: 'master'
    }
  }
};
